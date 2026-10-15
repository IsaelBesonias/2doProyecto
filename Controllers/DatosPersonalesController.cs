using Microsoft.AspNetCore.Mvc;

namespace DatosPersonalesApi.Controllers;

[ApiController]
[Route("api/datospersonales")]
public class DatosPersonalesController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new
        {
            nombre = "Ana Pérez",
            fechaNacimiento = "2002-05-14",
            direccion = "Calle Principal #10"
        });
    }
}