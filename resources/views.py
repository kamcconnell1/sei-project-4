# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated
# from rest_framework.permissions import IsAuthenticated

from .models import Resource
from .serializers import ResourceSerializer

class ResourceListView(APIView):

    def get(self, request):
        resources = Resource.objects.all()
        serialized_resources = ResourceSerializer(resources, many=True)
        return Response(serialized_resources.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data['owner'] = request.user.id
        new_resource = ResourceSerializer(data=request.data)
        if new_resource.is_valid():
            new_resource.save()
            return Response(new_resource.data, status=status.HTTP_201_CREATED)
        return Response(new_resource.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class ResourceDetailView(APIView):

    permission_classes = (IsAuthenticated, )

    def get_resource(self, pk):
        try:
            return Resource.objects.get(pk=pk)
        except Resource.DoesNotExist:
            raise NotFound()

    def is_resource_owner(self, resource, user):
        if resource.owner.id != user.id:
            raise PermissionDenied()

    def get(self, request, pk):
        resource = self.get_resource(pk)
        self.is_resource_owner(resource, request.user)
        resource_to_show = ResourceSerializer(resource)
        return Response(resource_to_show.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        resource = self.get_resource(pk)
        self.is_resource_owner(resource, request.user)
        request.data['owner'] = request.user.id
        updated_resource = ResourceSerializer(resource, data=request.data)
        if updated_resource.is_valid():
            updated_resource.save()
            return Response(updated_resource.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_resource.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, pk):
        resource_to_delete = self.get_resource(pk)
        self.is_resource_owner(resource_to_delete, request.user)
        resource_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
