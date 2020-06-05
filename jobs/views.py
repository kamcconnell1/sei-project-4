# pylint: disable=no-member
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from .models import Job
from .serializers import JobSerializer, PopulatedJobSerializer


class JobBoardView(APIView):

    def get(self, request):
        jobs = Job.objects.all()
        serialized_jobs = PopulatedJobSerializer(jobs, many=True)
        return Response(serialized_jobs.data, status=status.HTTP_200_OK)

    def post(self, request):
        new_job = JobSerializer(data=request.data)
        if new_job.is_valid():
            new_job.save()
            return Response(new_job.data, status=status.HTTP_201_CREATED)
        return Response(new_job.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class JobDetailsView(APIView):

    def get_job(self, pk):
        try:
            return Job.objects.get(pk=pk)
        except Job.DoesNotExist:
            raise NotFound()

    def get(self, requset, pk):
        job = self.get_job(pk)
        serialized_job = PopulatedJobSerializer(job)
        return Response(serialized_job.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        job_to_update = self.get_job(pk)
        updated_job = JobSerializer(job_to_update, data=request.data)
        if updated_job.is_valid():
            updated_job.save()
            return Response(updated_job.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_job.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, pk):
        job_to_delete = self.get_job(pk)
        job_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
