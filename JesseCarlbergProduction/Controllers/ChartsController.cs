using JesseCarlbergProduction.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace JesseCarlbergProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChartsController : ControllerBase
    {
        /// <summary>
        /// Returns a list of coding skills
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("codeskills")]
        public List<ChartModel> getCodingSkills()
        {
            List<ChartModel> skillsList = new List<ChartModel>();
            ChartModel skill = new ChartModel();
            skill.skill = "C#";
            skill.value = 9;
            skillsList.Add(skill);
            skill = new ChartModel();
            skill.skill = "Java";
            skill.value = 5;
            skillsList.Add(skill);
            skill = new ChartModel();
            skill.skill = "Angular";
            skill.value = 9;
            skillsList.Add(skill);
            skill = new ChartModel();
            skill.skill = ".NET";
            skill.value = 9;
            skillsList.Add(skill);
            skill = new ChartModel();
            skill.skill = "SQL";
            skill.value = 8;
            skillsList.Add(skill);
            skill = new ChartModel();
            skill.skill = "Angular.JS";
            skill.value = 8;
            skillsList.Add(skill);
            skill = new ChartModel();
            skill.skill = "Javascript";
            skill.value = 9;
            skillsList.Add(skill);
            skill = new ChartModel();
            skill.skill = "CSS";
            skill.value = 9;
            skillsList.Add(skill);
            skill = new ChartModel();
            skill.skill = "VB";
            skill.value = 8;
            skillsList.Add(skill);
            skill = new ChartModel();
            skill.skill = "Azure";
            skill.value = 6;
            skillsList.Add(skill);
            return skillsList;
        }

        /// <summary>
        /// Returns list of soft skills
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("softskills")]
        public List<ChartModel> getSoftSkills()
        {
            List<ChartModel> skillsList = new List<ChartModel>();
            ChartModel skill = new ChartModel();
            skill.skill = "Communication";
            skill.value = 8;
            skillsList.Add(skill);
            skill = new ChartModel();
            skill.skill = "Leadership";
            skill.value = 9;
            skillsList.Add(skill);
            skill = new ChartModel();
            skill.skill = "Influencer";
            skill.value = 8;
            skillsList.Add(skill);
            skill = new ChartModel();
            skill.skill = "Project Management";
            skill.value = 8;
            skillsList.Add(skill);
            skill = new ChartModel();
            skill.skill = "Quick Learner";
            skill.value = 8;
            skillsList.Add(skill);
            skill = new ChartModel();
            skill.skill = "Adaptability";
            skill.value = 9;
            skillsList.Add(skill);
            skill = new ChartModel();
            skill.skill = "Dependability";
            skill.value = 9;
            skillsList.Add(skill);
            skill = new ChartModel();
            skill.skill = "Team Oriented";
            skill.value = 7;
            skillsList.Add(skill);
            return skillsList;
        }
    }
}