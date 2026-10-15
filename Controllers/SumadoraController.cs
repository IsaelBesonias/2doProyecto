using Microsoft.AspNetCore.Mvc;

namespace DatosPersonalesApi.Controllers;

[ApiController]
[Route("api/sumadora")]
public class SumadoraController : ControllerBase
{
    [HttpPost]
    public IActionResult Post([FromBody] SumadoraRequest request)
    {
        return Ok(new { resultado = request.Numero1 + request.Numero2 });
    }
}

public sealed record SumadoraRequest(decimal Numero1, decimal Numero2);