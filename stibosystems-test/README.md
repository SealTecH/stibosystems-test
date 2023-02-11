# StibosystemsTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.2.

# Notes and considerations to the Test Task
1. added prefix to url to avoid collision with json-server, so app is available at  `http://localhost:4200/stibo`. Probably it could be done in another way, but this was just very simple 
2. Used virtual scroll on list page to address rendering 1000 items problem. Solution could be different, but I believe this one fits well. For the same purpuse ngSwitch was done outside of For loop - to reduce the calls, as a drawback - more boilerplate
3. One of the criteria was to reduce API calls. For these purpose intentionally was done:
   1. data is storing in `ListPageService` and is not called until page reload. It's a subject to caching, but this wasn't required
   2. If navigate List-> entity page, is passed already loaded data, and app does not call it from server
4. Intentionally list and entity pages were implemented in a different way. For sure, it is possible to re-use single item page, like it was done with the list page. It was done just for demonstration purpose
5. Server-side fields are cut. Probably, in a real-life app we still should keep them (in case pushing changes to server)
6. Tests are showed on `List Page` and `User Page`. They're for sure do not cover 100%, as per requirement 'some tests'
7. It took me more than 4 hours tbh, but I believe it's worth it =)
