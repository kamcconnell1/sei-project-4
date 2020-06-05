# pylint: disable=no-member
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from .models import JobStatus
from .serializers import PopulatedJobStatusSerializer, JobSerializer


class JobStatusListView(APIView):

    def get(self, request):
        job_statuses = JobStatus.objects.all()
        serialized_job_statuses = PopulatedJobStatusSerializer(
            job_statuses, many=True)
        return Response(serialized_job_statuses.data, status=status.HTTP_200_OK)


class JobStatusDetailsView(APIView):

    def get_job_status(self, pk):
        try:
            return JobStatus.objects.get(pk=pk)
        except JobStatus.DoesNotExist:
            raise NotFound()

    def get(self, request, pk):
        job_status = self.get_job_status(pk)
        serialized_job_status = PopulatedJobStatusSerializer(job_status)
        return Response(serialized_job_status.data, status=status.HTTP_200_OK)
