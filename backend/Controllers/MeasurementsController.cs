using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Slimbo.Data;
using Slimbo.Models.Entities;
using Slimbo.Models.Requests;

namespace Slimbo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MeasurementsController : ControllerBase
    {
        private readonly AppDbContext db;

        public MeasurementsController(AppDbContext db)
        {
            this.db = db;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Measurement>>> GetMeasurements([FromQuery] DateTimeOffset? from, [FromQuery] DateTimeOffset? to)
        {
            var query = db.Measurements.AsNoTracking();

            if (from.HasValue)
                query = query.Where(m => m.Timestamp >= from.Value);
            if (to.HasValue)
                query = query.Where(m => m.Timestamp <= to.Value);

            var result = await query.ToListAsync(HttpContext.RequestAborted);
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<Measurement>> CreateMeasurement([FromBody] CreateMeasurement request)
        {
            var result = await db.Measurements.AddAsync(new Measurement
            {
                Timestamp = DateTimeOffset.Now,
                Weight = request.Weight
            }, HttpContext.RequestAborted);

            await db.SaveChangesAsync(HttpContext.RequestAborted);
            return Ok(result.Entity);
        }

        [HttpPut("{id:Guid}")]
        public async Task<ActionResult<Measurement>> UpdateMeasurement(Guid id, [FromBody] UpdateMeasurement request)
        {
            var measure = await db.Measurements.FirstOrDefaultAsync(m => m.Id == id, HttpContext.RequestAborted);

            if (measure == null)
                return NotFound();

            measure.Weight = request.Weight;

            await db.SaveChangesAsync(HttpContext.RequestAborted);
            return Ok(measure);
        }

        [HttpDelete("{id:Guid}")]
        public async Task<ActionResult> DeleteMeasurement(Guid id)
        {
            var measure = await db.Measurements.FirstOrDefaultAsync(m => m.Id == id, HttpContext.RequestAborted);

            if (measure == null)
                return NotFound();

            db.Measurements.Remove(measure);
            await db.SaveChangesAsync(HttpContext.RequestAborted);

            return NoContent();
        }
    }
}
