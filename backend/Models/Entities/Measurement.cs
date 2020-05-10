using System;

namespace Slimbo.Models.Entities
{
    public class Measurement
    {
        public Guid Id { get; set; }
        public DateTimeOffset Timestamp { get; set; }
        public double Weight { get; set; }
    }
}