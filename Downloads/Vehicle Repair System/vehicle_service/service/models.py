from django.db import models

class Component(models.Model):
    name = models.CharField(max_length=255)
    repair_price = models.DecimalField(max_digits=10, decimal_places=2)
    purchase_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return self.name

class Vehicle(models.Model):
    plate_number = models.CharField(max_length=255)
    model = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.plate_number} - {self.model}"

class Issue(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    description = models.TextField()
    is_repair = models.BooleanField(default=True)
    components = models.ManyToManyField(Component, blank=True)

    def __str__(self):
        return f"Issue for {self.vehicle} - {'Repair' if self.is_repair else 'Purchase'}"
    
    def calculate_final_price(self):
        if self.is_repair:
            return sum(component.repair_price for component in self.components.all())
        else:
            return sum(component.purchase_price for component in self.components.all())

class Transaction(models.Model):
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()

    def __str__(self):
        return f"Transaction for {self.issue} on {self.date}"
