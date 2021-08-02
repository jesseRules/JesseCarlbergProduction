using System;
using System.Collections.Generic;

namespace JesseCarlbergProduction.Models.JHE
{
    public class JHEChartJsModel
    {
        public List<String> labels { get; set; }
        public List<JHEChartJsModelData> datasets { get; set; }
    }

    public class JHEChartJsModelData
    {
        public String label { get; set; }
        public List<int> data { get; set; }
        public List<String> backgroundColor { get; set; }
        public List<String> borderColor { get; set; }
        public int borderWidth { get; set; }
    }
}