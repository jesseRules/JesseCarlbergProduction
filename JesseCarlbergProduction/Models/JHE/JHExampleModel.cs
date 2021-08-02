using System;
using System.Collections.Generic;

namespace JesseCarlbergProduction.Models.JHE
{
    public class JHExampleModel
    {
        public Object classifications { get; set; }
        public DataSetInformation dataSetInformation { get; set; }
        public RecordLayout recordLayout { get; set; }
        public List<JHRecords> records { get; set; }
        public bool reference { get; set; }
        public int revisionNumber { get; set; }
        public Object totals { get; set; }
        public Object variableGroups { get; set; }
    }

    public class RecordLayout
    {
        public bool isPrivate { get; set; }
        public bool reference { get; set; }
        public int revisionNumber { get; set; }
        public List<RecordLayoutVariables> variables { get; set; }
    }

    public class JHRecords
    {
        public List<JHRecordData> data { get; set; }
    }

    public class JHRecordData
    {
        public Object attributes { get; set; }
        public JHRecordDataValue value { get; set; }
        public JHRecordDataValueVariable variable { get; set; }
    }

    public class JHRecordDataValue
    {
        public Object attributes { get; set; }
        public Object value { get; set; }
        public JHRecordDataValueVariable variable { get; set; }
    }

    public class JHRecordDataValueVariable
    {
        public int fixedStorageWidth { get; set; }
        public string id { get; set; }
        public string name { get; set; }
        public bool reference { get; set; }
        public int revisionNumber { get; set; }
        public string storageType { get; set; }
        public string uri { get; set; }
    }

    public class RecordLayoutVariables
    {
        public string classificationUri { get; set; }
        public string dataType { get; set; }
        public string description { get; set; }
        public int fixedStorageWidth { get; set; }
        public string format { get; set; }
        public string id { get; set; }
        public int index { get; set; }
        public bool isDimension { get; set; }
        public bool isMeasure { get; set; }
        public string label { get; set; }
        public string name { get; set; }
        public bool reference { get; set; }
        public int revisionNumber { get; set; }
        public string storageType { get; set; }
        public string uri { get; set; }
    }

    public class DataSetInformation
    {
        public bool cached { get; set; }
        public Int32 columnCount { get; set; }
        public Int32 columnLimit { get; set; }
        public Int32 columnOffset { get; set; }
        public DateTime end { get; set; }
        public bool includeMetadata { get; set; }
        public bool moreColumns { get; set; }
        public bool moreRows { get; set; }
        public String[] notes { get; set; }
        public Int32 postQueryTime { get; set; }
        public Int32 preQueryTime { get; set; }
        public Int32 queryTime { get; set; }
        public Int32 rowCount { get; set; }
        public Int32 rowLimit { get; set; }
        public Int32 rowOffset { get; set; }
        public DateTime start { get; set; }
        public Int32 totalProcessingTime { get; set; }
    }
}