using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace OnlineOutagePrototype
{
    public class BundleConfig
    {
        public static void RegisterBundlesJS(BundleCollection bundles)
        {
            bundles.UseCdn = true;

            //generics. 
            bundles.Add(
                new ScriptBundle("~/bundles/jquery")
                    .Include(
                    "~/Scripts/jquery-1.7.2.min.js", 
                    "~/Scripts/jquery.radiobutton.2.0.js", 
                    "~/Scripts/jquery.selectbox.0.2.min.js", 
                    "~/Scripts/icheck/jquery.icheck.min.js",
                    "~/Scripts/jquery-ui-1.11.4.min.js"));

            bundles.Add(
                new ScriptBundle("~/bundles/angular")
                    .Include(
                    "~/Scripts/angular.js", 
                    "~/Scripts/angular-route.js"));

            bundles.Add(
                new ScriptBundle("~/bundles/app")
                    .Include("~/js/application.js"));

            bundles.Add(
                new StyleBundle("~/styles/app")
                    .Include(
                    "~/Styles/bootstrap.css", 
                    "~/Styles/app.css", 
                    "~/Scripts/icheck/minimal/grey.css"));
        }
    }
}