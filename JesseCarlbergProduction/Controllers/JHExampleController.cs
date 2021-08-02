using JesseCarlbergProduction.Models.JHE;
using JesseCarlbergProduction.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace JesseCarlbergProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JHExampleController : ControllerBase
    {
        // FIPS https://transition.fcc.gov/oet/info/maps/census/fips/fips.txt#:~:text=FIPS%20codes%20are%20numbers%20which,to%20which%20the%20county%20belongs.
        // Source https://documenter.getpostman.com/view/2220438/SzYevv9u
        private readonly JHExampleService _jhExampleService;

        public JHExampleController()
        {
            _jhExampleService = new JHExampleService();
        }

        /// <summary>
        /// Returns data
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("data")]
        public JHExampleModel GetByCounty(string county, int count, int offset)
        {
            return _jhExampleService.getCasesByCounty(county, offset, count);
        }

        /// <summary>
        /// Returns data
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("minimal")]
        public JHEMinimal GetByCountyMinimal(string county, int count, int offset)
        {
            return _jhExampleService.getCasesByCountyMinimal(county, offset, count);
        }

        /// <summary>
        /// Returns data
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("chart")]
        public JHEChartModel GetByCountyChart(string county, int count)
        {
            return _jhExampleService.getCasesByCountyChart(county, count);
        }

        /// <summary>
        /// Returns data
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("county/chartjs")]
        public JHEChartJsModel GetByCountyChartJs(string county, int count)
        {
            return _jhExampleService.getCasesByCountyChartForChartJs(county, count);
        }

        /// <summary>
        /// Returns data by State
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("state/chartjs")]
        public JHEChartJsModel GetByStateChartJs(string state, int count)
        {
            return _jhExampleService.getCasesByStateChartForChartJs(state, count);
        }

        /// <summary>
        /// Returns list of states
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("states")]
        public List<StatesModel> GetStatesRef()
        {
            return _jhExampleService.getStates();
        }
    }
}