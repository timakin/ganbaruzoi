<h1><%= date %>_日報</h1>

## 課題とアクション

### 課題

<%= problem %>

### アクション

<%= action %>

## 当初の予定

<ul>
<% for (var i = 0; i < schedules.length; i++) { %>
    <% for (key in schedules[i]) { %>
<li><p><%= key %>: <%= reschedules[i][key] %></p></li>
    <% } %>
<% } %>
</ul>


<%= schedule %>

## 予定のアップデート

<% for (var i = 0; i < reschedules.length; i++) { %>
    <% for (key in reschedules[i]) { %>
<h4><%= key %></h4>
<p><%= reschedules[i][key] %></p>
    <% } %>
<% } %>

## 今日やったこと

<ul>
<% for (var i = 0; i < reports.length; i++) { %>
    <% for (key in reports[i]) { %>
        <li><%= key %>: <%= reports[i][key] %></li>
    <% } %>
<% } %>
</ul>

## たまった知見

<ul>
<% for (var i = 0; i < knowhow.length; i++) { %>
    <li><%= knowhow[i] %></li>
<% } %>
</ul>

## 振り返り

<ul>
<% for (var i = 0; i < reviews.length; i++) { %>
    <li><%= reviews[i] %></li>
<% } %>
</ul>
