from rest_framework import serializers
from django.apps import apps
from .models import Task
from task_categories.serializers import TaskCategorySerializer


Job = apps.get_model('jobs', 'Job')

class JobSerializer(serializers.ModelSerializer):

    class Meta:
        model = Job
        fields = ('id', 'job_title', 'company')

class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = '__all__'

class PopulatedTaskSerializer(TaskSerializer):
    task_category = TaskCategorySerializer()
    job = JobSerializer()
