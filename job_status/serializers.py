from rest_framework import serializers
from django.apps import apps

from .models import JobStatus
Job = apps.get_model('jobs', 'Job')

class JobSerializer(serializers.ModelSerializer):

    class Meta: 
        model = Job
        fields = ('job_title', 'company')

class JobStatusSerializer(serializers.ModelSerializer):

    class Meta:
        model = JobStatus
        fields = '__all__'


class PopulatedJobStatusSerializer(JobStatusSerializer):
    jobs = JobSerializer(many=True)