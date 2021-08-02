using System;

namespace JesseCarlbergProduction.Models.JHE
{
    public class JHEMinimal
    {
        public JHEMinimalInfo info { get; set; }
        public Object records { get; set; }
    }

    public class JHEMinimalInfo
    {
        public bool cached { get; set; }
        public int columnCount { get; set; }
        public int columnLimit { get; set; }
        public int columnOffset { get; set; }
        public DateTime end { get; set; }
        public bool includeMetadata { get; set; }
        public bool moreColumns { get; set; }
        public bool moreRows { get; set; }
        public Object notes { get; set; }
        public int postQueryTime { get; set; }
        public int preQueryTime { get; set; }
        public int queryTime { get; set; }
        public int rowCount { get; set; }
        public int rowLimit { get; set; }
        public int rowOffset { get; set; }
        public DateTime start { get; set; }
        public int totalProcessingTime { get; set; }
    }
}