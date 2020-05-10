using System;

namespace Slimbo.Models.Requests
{
    public class UpdateMeasurement
    {
        public Guid Id { get; set; }
        public double Weight { get; set; }
    }
}