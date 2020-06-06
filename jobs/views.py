# pylint: disable=no-member
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .models import Job
from .serializers import JobSerializer, PopulatedJobSerializer


class JobBoardView(APIView):

    permission_classes = (IsAuthenticated, )

    def get(self, request):
        jobs = Job.objects.filter(owner=request.user.id)
        serialized_jobs = PopulatedJobSerializer(jobs, many=True)
        return Response(serialized_jobs.data, status=status.HTTP_200_OK)

    def post(self, request):
        new_job = JobSerializer(data=request.data)
        request.data['owner'] = request.user.id
        if new_job.is_valid():
            new_job.save()
            return Response(new_job.data, status=status.HTTP_201_CREATED)
        return Response(new_job.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class JobDetailsView(APIView):

    permission_classes = (IsAuthenticated, )

    def get_job(self, pk):
        try:
            return Job.objects.get(pk=pk)
        except Job.DoesNotExist:
            raise NotFound()

    def is_job_owner(self, job, user):
        if job.owner.id != user.id:
            raise PermissionDenied()

    def get(self, request, pk):
        job = self.get_job(pk)
        self.is_job_owner(job, request.user)
        serialized_job = PopulatedJobSerializer(job)
        return Response(serialized_job.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        job_to_update = self.get_job(pk)
        self.is_job_owner(job_to_update, request.user)
        request.data['owner'] = request.user.id
        updated_job = JobSerializer(job_to_update, data=request.data)
        if updated_job.is_valid():
            updated_job.save()
            return Response(updated_job.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_job.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, pk):
        job_to_delete = self.get_job(pk)
        self.is_job_owner(job_to_delete, request.user)
        job_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
