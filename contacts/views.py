# pylint: disable=no-member
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .models import Contact
from .serializers import ContactSerializer, PopulatedContactSerializer

#* List view for all contacts
class ContactListView(APIView):
    
    permission_classes = (IsAuthenticated, )

#* GET all contacts
    def get(self, request):
        contacts = Contact.objects.filter(owner=request.user.id)
        serialized_contacts = PopulatedContactSerializer(contacts, many=True)
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

    permission_classes = (IsAuthenticated, )

    def get_contact(self, pk):
        try:
            return Contact.objects.get(pk=pk)
        except Contact.DoesNotExist:
            raise NotFound()

    def is_contact_owner(self, contact, user):
        if contact.owner.id != user.id:
            raise PermissionDenied()

#* GET a single contact
    def get(self, request, pk):
        contact = self.get_contact(pk)
        self.is_contact_owner(contact, request.user)
        serialized_contact = PopulatedContactSerializer(contact)
        return Response(serialized_contact.data)    

#* EDIT a contact
    def put(self, request, pk):
        contact_to_update = self.get_contact(pk)
        self.is_contact_owner(contact_to_update, request.user)
        updated_contact = ContactSerializer(contact_to_update, data=request.data)
        if updated_contact.is_valid():
            updated_contact.save()
            return Response(updated_contact.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_contact.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


#* DELETE a contact
    def delete(self, request, pk):
        contact_to_delete = self.get_contact(pk)
        self.is_contact_owner(contact_to_delete, request.user)
        contact_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)