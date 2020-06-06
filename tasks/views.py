# pylint: disable=no-member
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import Task
from .serializers import TaskSerializer, PopulatedTaskSerializer


#* List of all the tasks 
class TaskListView(APIView):
    
    permission_classes = (IsAuthenticated, )

#* GET all tasks
    def get(self, request):
        tasks = Task.objects.filter(owner=request.user.id)
        serialized_tasks = PopulatedTaskSerializer(tasks, many=True)
        return Response(serialized_tasks.data, status=status.HTTP_200_OK)

#* ADD a new task
    def post(self, request):
        new_task = TaskSerializer(data=request.data)
        request.data['owner'] = request.user.id
        if new_task.is_valid():
            new_task.save()
            return Response(new_task.data, status=status.HTTP_201_CREATED)
        return Response(new_task.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)





#* Detail view of one task
class TaskDetailView(APIView):

    permission_classes = (IsAuthenticated, )

    def get_task(self,pk):
        try:
            return Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            raise NotFound()

    def is_task_owner(self, task, user):
        if task.owner.id != user.id:
            raise PermissionDenied()
        

#* GET a single task
    def get(self, request, pk):
        task = self.get_task(pk)
        self.is_task_owner(task, request.user)
        serialized_task = PopulatedTaskSerializer(task)
        return Response(serialized_task.data)

#* EDIT a task
    def put(self, request, pk):
        task_to_update = self.get_task(pk)
        self.is_task_owner(task_to_update, request.user)
        request.data['owner'] = request.user.id
        updated_task = TaskSerializer(task_to_update, data=request.data)
        if updated_task.is_valid():
            updated_task.save()
            return Response(updated_task.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_task.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

#* DELETE a task
    def delete(self, request, pk):
        task_to_delete = self.get_task(pk)
        self.is_task_owner(task_to_delete, request.user)
        task_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)