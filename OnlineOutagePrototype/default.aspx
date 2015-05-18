<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="OnlineOutagePrototype._default" %>
<%@ Import Namespace="System.Web.Optimization" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8" />
    <title>Online Outage</title>
    <%: Styles.Render("~/styles/app") %>
</head>
<body  ng-app="map" ng-controller="rootController">
  <form id="aspdotnet_form" name="testform">
    <div id="wrap" class="container">
      <div class="masthead">
        <h3 class="muted">Google Map prototype with TypeScript & AngularJS</h3>
        <div class="navbar">
          <div class="navbar-inner">
            <div class="container">
              <ul class="nav">
                <li><a href="#/">Intro</a></li>
                <li><a href="#/map">Map</a></li>
                <li><a href="#/report">Report</a></li>
              </ul>
            </div>
          </div>
        </div><!-- /.navbar -->
      </div>

      <div ng-view>
        
      </div>
      <div ng-show="showIntro" ng-controller="introController" >
        <h1>Intro</h1>
        <div class="container">
          <p>Blah blah blah</p>
          <button class="btn btn-small btn-primary" type="button" ng-click="introVm.LoadMap()">Load Map</button>
        </div>
      </div>

      <div class="row-fluid" ng-cloak ng-show="showHomeComponent">
        <div class="span4">
          <input type="radio" id="unplaned" /><label>Unplaned</label> 
          <input type="radio" id="planed" /><label>Planed</label> 
        </div>
      </div>
    </div>

    <div id="footer">
      <div class="container">
        <p class="muted credit" style="margin-top:12px;">prototype created by TT.</p>
      </div>
    </div>
  </form>

    <%: Scripts.Render("~/bundles/jquery") %>
    <%: Scripts.Render("~/bundles/angular") %>
    <script src="http://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&libraries=places"></script>
    <%: Scripts.Render("~/bundles/app") %>
</body>
</html>
