using Domain.DTOs;
using Domain.Validators.Shared;
using FluentValidation;

namespace Domain.Validators
{
    public class EditUserPayloadValidator : AbstractValidator<EditUserPayload>
    {
        public EditUserPayloadValidator(ICommonValidators commonValidators)
        {
            RuleFor(user => user.Id)
                .NotEmpty()                
                .GreaterThan(0)
                .WithMessage("El campo es requerido");

            RuleFor(user => user.Name)
                .NotEmpty()
                .WithMessage("El campo es requerido")
                .MaximumLength(20)
                .WithMessage("Máximo 20 caracteres");

            RuleFor(user => user.Lastname)
                .NotEmpty()
                .WithMessage("El campo es requerido")
                .MaximumLength(20)
                .WithMessage("Máximo 20 caracteres");

            RuleFor(user => user.Email)
                .EmailAddress()
                .WithMessage("Debe ser formato de Correo electrónico")
                .NotEmpty()
                .WithMessage("El campo es requerido")
                .MaximumLength(200)
                .WithMessage("Máximo 200 caracteres");

            RuleFor(user => user.BirthDate)
                .MustAsync(async (birthDate, cancellation) => await commonValidators
                .BeAValidAge(birthDate))
                .WithMessage("Debe ser una fecha valida");

            RuleFor(user => user.Phone)
               .Must(x => x == null || x.Length <= 15)
               .WithMessage("Máximo 15 caracteres");

            RuleFor(user => user.ResidenceCountry)
                .NotEmpty()
                .WithMessage("El campo es requerido")
                .MaximumLength(3)
                .WithMessage("Máximo 3 caracteres");

            RuleFor(user => user.ReceiveInformation)
                .NotEmpty()
                .WithMessage("El campo es requerido");
        }

        
    }
}
