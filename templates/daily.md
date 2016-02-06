<h1><%= json.date %>_日報</h1>

## 課題とアクション

### 課題

<%= json.problem %>

### アクション

<%= json.action %>

## 当初の予定

```
<%= json.schedule %>
```

## 予定のアップデート

<% for (var i = 0; i < json.reschedules.length; i++) { %>
	<% for (key in json.reschedules[i]) { %>
		<h4><%= key %></h4>
		<p><%= json.reschedules[i][key] %></p>
	<% } %>
<% } %>

## 今日やったこと

<ul>
<% for (var i = 0; i < json.reports.length; i++) { %>
	<% for (key in json.reports[i]) { %>
		<li><%= key %>: <%= json.reports[i][key] %></li>
	<% } %>
<% } %>
</ul>

## たまった知見

<ul>
<% for (var i = 0; i < json.knowhow.length; i++) { %>
	<% for (key in json.knowhow[i]) { %>
		<li><%= key %>: <%= json.knowhow[i][key] %></li>
	<% } %>
<% } %>
</ul>

## 振り返り

<ul>
<% for (var i = 0; i < json.reviews.length; i++) { %>
	<li><%= json.reviews[i] %></li>
<% } %>
</ul>