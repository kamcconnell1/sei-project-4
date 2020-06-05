from rest_framework import serializers

from job_status.serializers import JobStatusSerializer
from .models import Job

class JobSerializer(serializers.ModelSerializer):

    class Meta:
        model = Job
        fields = '__all__'

class PopulatedJobSerializer(JobSerializer):
    status = JobStatusSerializer()
