# pylint: disable=no-member
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated

from .models import Contact
from .serializers import ContactSerializer

#* List view for all contacts
class ContactListView(APIView):
    
    permission_classes = (IsAuthenticated, )

#* GET all contacts
    def get(self, _request):
        contacts = Contact.objects.all()
        serialized_contacts = ContactSerializer(contacts, many=True)
        return Response(serialized_contacts.data, status=status.HTTP_200_OK)

#* ADD a new contact
    def post(self, request):
        new_contact = ContactSerializer(data=request.data)
        request.data['owner'] = request.user.id
        if new_contact.is_valid():
            new_contact.save()
            return Response(new_contact.data, status=status.HTTP_201_CREATED)
        return Response(new_contact.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)





class ContactDetailView(APIView):

    def get_contact(self, pk):
        try:
            return Contact.objects.get(pk=pk)
        except Contact.DoesNotExist:
            raise NotFound()

#* GET a single contact
    def get(self, _request, pk):
        contact = self.get_contact(pk)
        serialized_contact = ContactSerializer(contact)
        return Response(serialized_contact.data)    

#* EDIT a contact
    def put(self, request, pk):
        contact_to_update = self.get_contact(pk)
        updated_contact = ContactSerializer(contact_to_update, data=request.data)
        if updated_contact.is_valid():
            updated_contact.save()
            return Response(updated_contact.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_contact.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


#* DELETE a contact
    def delete(self, _request, pk):
        contact_to_delete = self.get_contact(pk)
        contact_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)