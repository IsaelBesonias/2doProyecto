using Microsoft.AspNetCore.Mvc;

namespace DatosPersonalesApi.Controllers;

[ApiController]
[Route("api/mascotas")]
public class MascotasController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new[]
        {
            new { id = 1, nombre = "Firulais", edad = 3, raza = "Labrador" },
            new { id = 2, nombre = "Luna", edad = 2, raza = "Poodle" },
            new { id = 3, nombre = "Alex", edad = 5, raza = "Pastor Alemán" },
            new { id = 4, nombre = "Michi", edad = 1, raza = "Siamés" },
            new { id = 5, nombre = "Benji", edad = 4, raza = "Bulldog" }
        });
    }
}