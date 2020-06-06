from rest_framework import serializers
from django.apps import apps
from job_status.serializers import JobStatusSerializer
from .models import Job

Task = apps.get_model('tasks', 'Task' )
Contact = apps.get_model('contacts', 'Contact')

class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = ('id', 'task_category', 'reminder_date', 'notes')


class ContactSerializer(serializers.ModelSerializer):

    class Meta:
        model = Contact
        fields = ('id', 'name', 'job_title', 'phone', 'email')

class JobSerializer(serializers.ModelSerializer):

    class Meta:
        model = Job
        fields = '__all__'

class PopulatedJobSerializer(JobSerializer):
    status = JobStatusSerializer()
    related_tasks = TaskSerializer(many=True)
    related_contacts = ContactSerializer(many=True)
    
