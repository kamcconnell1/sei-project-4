from rest_framework import serializers
from django.apps import apps

from .models import Contact


Job = apps.get_model('jobs', 'Job')

class JobSerializer(serializers.ModelSerializer):

    class Meta:
        model = Job
        fields = ('id', 'job_title', 'company')

class ContactSerializer(serializers.ModelSerializer):

    class Meta:
        model = Contact
        fields = '__all__'


class PopulatedContactSerializer(ContactSerializer):
    job = JobSerializer()
