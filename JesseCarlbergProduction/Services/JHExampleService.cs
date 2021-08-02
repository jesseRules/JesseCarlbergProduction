using JesseCarlbergProduction.Models.JHE;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net.Http;

namespace JesseCarlbergProduction.Services
{
    public class JHExampleService
    {
        //Cases by County
        public JHExampleModel getCasesByCounty(string fipscode = "31153", int coloffset = 0, int limit = 50, int offset = 0)
        {
            var requestJH = new HttpRequestMessage(HttpMethod.Get, string.Format(@"
https://covid19.richdataservices.com/rds/api/query/us/jhu_county/select?collimit=25&coloffset={0}&count=true&limit={1}&where=(us_county_fips%3D{2})&format=MTNA&inject=true&metadata=true&offset={3}"
           , coloffset, limit, fipscode, offset));
            var http = new HttpClient();
            HttpResponseMessage responseUserTimeLine = http.SendAsync(requestJH).GetAwaiter().GetResult();
            string json = responseUserTimeLine.Content.ReadAsStringAsync().GetAwaiter().GetResult();
            return JsonConvert.DeserializeObject<JHExampleModel>(json);
        }

        //Cases by County
        public JHEMinimal getCasesByCountyMinimal(string fipscode = "31153", int coloffset = 0, int limit = 50, int offset = 0)
        {
            var requestJH = new HttpRequestMessage(HttpMethod.Get, string.Format(@"
https://covid19.richdataservices.com/rds/api/query/us/jhu_county/select?collimit=25&coloffset={0}&count=true&limit={1}&where=(us_county_fips%3D{2})&offset={3})"
           , coloffset, limit, fipscode, offset));
            var http = new HttpClient();
            HttpResponseMessage responseUserTimeLine = http.SendAsync(requestJH).GetAwaiter().GetResult();
            string json = responseUserTimeLine.Content.ReadAsStringAsync().GetAwaiter().GetResult();
            return JsonConvert.DeserializeObject<JHEMinimal>(json);
        }

        //Cases by County Chart
        public JHEChartModel getCasesByCountyChart(string fipscode = "31153", int limit = 500)
        {
            var url = @"https://covid19.richdataservices.com/rds/api/query/us/jhu_county/select?cols=date_stamp,cnt_confirmed,cnt_death,cnt_recovered&format=amcharts&limit={1}&where=(us_county_fips%3D{0})&orderby=date_stamp%20desc";
            var requestJH = new HttpRequestMessage(HttpMethod.Get, string.Format(url
           , limit, fipscode));
            var http = new HttpClient();
            HttpResponseMessage responseUserTimeLine = http.SendAsync(requestJH).GetAwaiter().GetResult();
            string json = responseUserTimeLine.Content.ReadAsStringAsync().GetAwaiter().GetResult();
            return JsonConvert.DeserializeObject<JHEChartModel>(json);
        }

        //Cases by County Chart
        public JHEChartJsModel getCasesByCountyChartForChartJs(string fipscode = "31153", int limit = 500)
        {
            var url = "https://covid19.richdataservices.com/rds/api/query/us/jhu_county/select?cols=date_stamp,cnt_confirmed,cnt_death,cnt_recovered&format=amcharts&limit=" + limit + "&where=(us_county_fips%3D" + fipscode + ")&orderby=date_stamp%20desc";
            var requestJHC = new HttpRequestMessage(HttpMethod.Get, url);
            var http = new HttpClient();
            HttpResponseMessage responseUserTimeLine = http.SendAsync(requestJHC).GetAwaiter().GetResult();
            string json = responseUserTimeLine.Content.ReadAsStringAsync().GetAwaiter().GetResult();
            JHEChartModel chjs = JsonConvert.DeserializeObject<JHEChartModel>(json);
            JHEChartJsModel jsch = new JHEChartJsModel();
            JHEChartJsModelData dat = new JHEChartJsModelData();
            jsch.datasets = new List<JHEChartJsModelData>();
            jsch.datasets.Add(dat);
            dat.label = "Cases Confirmed";
            dat.data = new List<int>();
            dat.backgroundColor = new List<string>();
            dat.borderColor = new List<string>();
            jsch.labels = new List<string>();
            chjs.dataProvider.ForEach(item =>
            {
                jsch.labels.Add(item.date_stamp.ToShortDateString());
                jsch.datasets[0].data.Add(item.cnt_confirmed);
                jsch.datasets[0].borderWidth = 1;
                jsch.datasets[0].backgroundColor.Add("rgba(255, 99, 132, 0.2)");
                jsch.datasets[0].borderColor.Add("rgba(255, 99, 132, 1)");
            });

            jsch.datasets[0].data.Reverse();
            jsch.datasets.Reverse();
            jsch.labels.Reverse();

            return jsch;
        }

        //Cases by State Chart
        public JHEChartJsModel getCasesByStateChartForChartJs(string fipscode = "31", int limit = 500)
        {
            var url = "https://covid19.richdataservices.com/rds/api/query/us/jhu_state/select?cols=date_stamp,cnt_confirmed,cnt_death,cnt_recovered&format=amcharts&limit=" + limit + "&where=(us_state_fips%3D" + fipscode + ")&orderby=date_stamp%20desc";
            var requestJHC = new HttpRequestMessage(HttpMethod.Get, url);
            var http = new HttpClient();
            HttpResponseMessage responseUserTimeLine = http.SendAsync(requestJHC).GetAwaiter().GetResult();
            string json = responseUserTimeLine.Content.ReadAsStringAsync().GetAwaiter().GetResult();
            JHEChartModel chjs = JsonConvert.DeserializeObject<JHEChartModel>(json);
            JHEChartJsModel jsch = new JHEChartJsModel();
            JHEChartJsModelData dat = new JHEChartJsModelData();
            jsch.datasets = new List<JHEChartJsModelData>();
            jsch.datasets.Add(dat);
            dat.label = "Cases Confirmed";
            dat.data = new List<int>();
            dat.backgroundColor = new List<string>();
            dat.borderColor = new List<string>();
            jsch.labels = new List<string>();
            chjs.dataProvider.ForEach(item =>
            {
                jsch.labels.Add(item.date_stamp.ToShortDateString());
                jsch.datasets[0].data.Add(item.cnt_confirmed);
                jsch.datasets[0].borderWidth = 1;
                jsch.datasets[0].backgroundColor.Add("rgba(255, 99, 132, 0.2)");
                jsch.datasets[0].borderColor.Add("rgba(255, 99, 132, 1)");
            });

            jsch.datasets[0].data.Reverse();
            jsch.datasets.Reverse();
            jsch.labels.Reverse();

            return jsch;
        }

        public List<StatesModel> getStates()
        {
            List<StatesModel> states = new List<StatesModel> {
            new StatesModel{
            name = "Alabama",
        abbreviation ="AL",
        fips = "01"
      },
       new StatesModel{
            name= "Alaska",
        abbreviation= "AK",
        fips = "02"
      },
      new StatesModel {
            name= "American Samoa",
        abbreviation= "AS",
          fips = "60"
      },
       new StatesModel{
            name= "Arizona",
        abbreviation= "AZ",
        fips = "04"
      },
      new StatesModel {
            name= "Arkansas",
        abbreviation= "AR",
        fips = "05"
      },
       new StatesModel{
            name= "California",
        abbreviation= "CA",
        fips = "06"
      },
      new StatesModel {
            name= "Colorado",
        abbreviation= "CO",
        fips = "08"
      },
      new StatesModel {
            name= "Connecticut",
        abbreviation= "CT",
        fips = "09"
      },
       new StatesModel{
            name= "Delaware",
        abbreviation= "DE",
        fips = "10"
      },
      new StatesModel {
            name= "District Of Columbia",
        abbreviation= "DC",
      },
       new StatesModel{
            name= "Florida",
        abbreviation= "FL",
        fips = "11"
      },
       new StatesModel{
            name= "Georgia",
        abbreviation= "GA",
        fips = "13"
      },
       new StatesModel{
            name= "Guam",
        abbreviation= "GU",
          fips = "66"
      },
       new StatesModel{
            name= "Hawaii",
        abbreviation= "HI",
        fips = "15"
      },
       new StatesModel{
            name= "Idaho",
        abbreviation= "ID",
        fips = "16"
      },
       new StatesModel{
            name= "Illinois",
        abbreviation= "IL",
        fips = "17"
      },
      new StatesModel {
            name= "Indiana",
        abbreviation= "IN",
        fips = "18"
      },
       new StatesModel{
            name= "Iowa",
        abbreviation= "IA",
        fips = "19"
      },
      new StatesModel {
            name= "Kansas",
        abbreviation= "KS",
        fips = "20"
      },
      new StatesModel {
            name= "Kentucky",
        abbreviation= "KY",
         fips = "21"
      },
       new StatesModel{
            name= "Louisiana",
        abbreviation= "LA",
         fips = "22"
      },
      new StatesModel {
            name= "Maine",
        abbreviation= "ME",
         fips = "23"
      },
       new StatesModel{
            name= "Maryland",
        abbreviation= "MD",
         fips = "24"
      },
       new StatesModel{
            name= "Massachusetts",
        abbreviation= "MA",
         fips = "25"
      },
      new StatesModel {
            name= "Michigan",
        abbreviation= "MI",
         fips = "26"
      },
      new StatesModel {
            name= "Minnesota",
        abbreviation= "MN",
         fips = "27"
      },
      new StatesModel {
            name= "Mississippi",
        abbreviation= "MS",
         fips = "28"
      },
      new StatesModel {
            name= "Missouri",
        abbreviation= "MO",
         fips = "29"
      },
      new StatesModel {
            name= "Montana",
        abbreviation= "MT",
         fips = "30"
      },
      new StatesModel {
            name= "Nebraska",
        abbreviation= "NE",
         fips = "31"
      },
      new StatesModel {
            name= "Nevada",
        abbreviation= "NV",
         fips = "32"
      },
      new StatesModel {
            name= "New Hampshire",
        abbreviation= "NH",
         fips = "33"
      },
      new StatesModel {
            name= "New Jersey",
        abbreviation= "NJ",
         fips = "34"
      },
      new StatesModel {
            name= "New Mexico",
        abbreviation= "NM",
         fips = "35"
      },
      new StatesModel {
            name= "New York",
        abbreviation= "NY",
         fips = "36"
      },
      new StatesModel {
            name= "North Carolina",
        abbreviation= "NC",
         fips = "37"
      },
      new StatesModel {
            name= "North Dakota",
        abbreviation= "ND",
         fips = "38"
      },
      new StatesModel {
            name= "Northern Mariana Islands",
        abbreviation= "MP",
          fips = "69"
      },
      new StatesModel {
            name= "Ohio",
        abbreviation= "OH",
         fips = "39"
      },
      new StatesModel {
            name= "Oklahoma",
        abbreviation= "OK",
         fips = "40"
      },
      new StatesModel {
            name= "Oregon",
        abbreviation= "OR",
         fips = "41"
      },
      new StatesModel {
            name= "Pennsylvania",
        abbreviation= "PA",
         fips = "42"
      },
      new StatesModel {
            name= "Puerto Rico",
        abbreviation= "PR",
          fips = "72"
      },
       new StatesModel{
            name= "Rhode Island",
        abbreviation= "RI",
         fips = "44"
      },
       new StatesModel{
            name= "South Carolina",
        abbreviation= "SC",
         fips = "45"
      },
      new StatesModel {
            name= "South Dakota",
        abbreviation= "SD",
         fips = "46"
      },
      new StatesModel {
            name= "Tennessee",
        abbreviation= "TN",
         fips = "47"
      },
      new StatesModel {
            name= "Texas",
        abbreviation= "TX",
         fips = "48"
      },
      new StatesModel {
            name= "Utah",
        abbreviation= "UT",
         fips = "49"
      },
      new StatesModel {
            name= "Vermont",
        abbreviation= "VT",
         fips = "50"
      },
       new StatesModel{
            name= "Virgin Islands",
        abbreviation= "VI",
          fips = "78"
      },
      new StatesModel {
            name= "Virginia",
        abbreviation= "VA",
         fips = "51"
      },
       new StatesModel{
            name= "Washington",
        abbreviation= "WA",
         fips = "53"
      },
     new StatesModel  {
            name= "West Virginia",
        abbreviation= "WV",
          fips = "54"
      },
      new StatesModel {
            name= "Wisconsin",
        abbreviation= "WI",
          fips = "55"
      },
      new StatesModel {
            name= "Wyoming",
        abbreviation= "WY",
          fips = "56"
      }
            };

            return states;
        }
    }
}