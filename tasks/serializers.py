from rest_framework import serializers

from .models import Task
from task_categories.serializers import TaskCategorySerializer

class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = '__all__'

class PopulatedTaskSerializer(TaskSerializer):
    task_category = TaskCategorySerializer()
