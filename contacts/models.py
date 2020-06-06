from django.db import models

class Contact(models.Model):
    name = models.CharField(max_length=60)
    job_title = models.CharField(max_length=60, blank=True, default='')
    phone = models.CharField(max_length=14, blank=True, default='')
    email = models.EmailField(blank=True, default='')
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='created_contacts',
        on_delete=models.CASCADE
    )
    job = models.ForeignKey(
        'jobs.Job',
        related_name='related_contacts',
        on_delete=models.SET_NULL,
        blank=True,
        null=True
    )

    def __str__(self):
        return f'{self.name} - {self.job_title}'
