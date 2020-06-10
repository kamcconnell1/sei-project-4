from rest_framework import serializers
from django.apps import apps
from job_status.serializers import JobStatusSerializer
from task_categories.serializers import TaskCategorySerializer
from .models import Job

Task = apps.get_model('tasks', 'Task' )
Contact = apps.get_model('contacts', 'Contact')

class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = '__all__'

class PopulatedTaskSerializer(TaskSerializer):
    task_category = TaskCategorySerializer()

class ContactSerializer(serializers.ModelSerializer):

    class Meta:
        model = Contact
        fields = '__all__'

class JobSerializer(serializers.ModelSerializer):

    class Meta:
        model = Job
        fields = '__all__'

class PopulatedJobSerializer(JobSerializer):
    status = JobStatusSerializer()
    related_tasks = PopulatedTaskSerializer(many=True)
    related_contacts = ContactSerializer(many=True)

