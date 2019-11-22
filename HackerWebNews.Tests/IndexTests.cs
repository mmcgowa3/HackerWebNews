using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System.IO;
using System.Reflection;

namespace HackerWebNews.Tests
{
    [TestClass]
    public class IndexTests
    {

        const string _siteUrl = "https://hackerwebnews.azurewebsites.net/";
        private readonly string _binFolder = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

        [TestMethod]
        public void TestPageLoad()
        {
            var driver = new ChromeDriver(_binFolder)
            {                 
                Url = _siteUrl
            };
            Assert.IsTrue(driver.Title == "Hacker Web News");
            driver.Dispose();
        }

        [TestMethod]
        public void TestNewsListLoaded()
        {
            var driver = new ChromeDriver(_binFolder)
            {
                Url = _siteUrl
            };

            var storyList = driver.FindElements(By.ClassName("listItem"));
            Assert.IsTrue(storyList.Count > 0);
            driver.Dispose();
        }

    }
}
