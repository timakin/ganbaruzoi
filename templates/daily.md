# <%= json.date %>_日報

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

<%= i %>. <%= key %>
```
<%= json.reschedules[i][key] %>
```

	<% } %>
<% } %>

## 今日やったこと

<% for (var i = 0; i < json.reports.length; i++) { %>
	<% for (key in json.reports[i]) { %>
- <%= key %>: <%= json.reports[i][key] %>
	<% } %>
<% } %>

## たまった知見

<% for (var i = 0; i < json.knowhow.length; i++) { %>
	<% for (key in json.knowhow[i]) { %>
- <%= key %>: <%= json.knowhow[i][key] %>
	<% } %>
<% } %>

## 振り返り

<% for (var i = 0; i < json.reviews.length; i++) { %>
- <%= json.reviews[i] %>
<% } %>