from rest_framework import serializers
from django.apps import apps
from job_status.serializers import JobStatusSerializer
from .models import Job

Task = apps.get_model('tasks', 'Task' )

class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = ('task_category', 'reminder_date', 'notes')


class JobSerializer(serializers.ModelSerializer):

    class Meta:
        model = Job
        fields = '__all__'

class PopulatedJobSerializer(JobSerializer):
    status = JobStatusSerializer()
    related_task = TaskSerializer(many=True)
    
