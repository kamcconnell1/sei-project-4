from django.db import models


class Job(models.Model):

    job_title = models.CharField(max_length=60)
    company = models.CharField(max_length=50)
    application_deadline = models.DateField(
        auto_now=False, 
        auto_now_add=False,
        null=True,
        blank=True
        )
    application_submitted = models.DateField(
        auto_now=False, 
        auto_now_add=False,
        null=True,
        blank=True
        )
    interview_date = models.DateTimeField(
        auto_now=False, 
        auto_now_add=False,
        null=True,
        blank=True
        )
    job_offer_date = models.DateField(
        auto_now=False, 
        auto_now_add=False,
        null=True,
        blank=True
        )
    offer_acceptance_date = models.DateField(
        auto_now=False, 
        auto_now_add=False,
        null=True,
        blank=True
        )
    job_url = models.CharField(max_length=400)
    salary = models.IntegerField(null=True, blank=True)
    city = models.CharField(max_length=60)
    country = models.CharField(max_length=60)
    description = models.TextField
    last_modified = models.DateField(auto_now=True)
    status = models.ForeignKey(
        'job_status.JobStatus',
        related_name='jobs',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f'{self.company} - {self.job_title}'


