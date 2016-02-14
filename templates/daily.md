<h1><%= date %>_日報</h1>

## 課題とアクション

### 課題

<strong><%= problem %></strong>

### アクション

<strong><%= action %></strong>

## 当初の予定

<table>
  	<tr>
    	<th>時間帯</th>
    	<th>内容</th>
  	</tr>
  	<% for (var i = 0; i < schedules.length; i++) { %>
    	<% for (key in schedules[i]) { %>
  			<tr>
    			<td><%= key %></td>
    			<td><%= schedules[i][key] %></td>
  			</tr>
    	<% } %>
	<% } %>
</table>

## 予定のアップデート

<% for (var i = 0; i < reschedules.length; i++) { %>
    <% for (key in reschedules[i]) { %>
      <blockquote><%= key %></blockquote>
      <table>
        <tr>
          <th>時間帯</th>
          <th>内容</th>
        </tr>
        <% for (var j = 0; j < reschedules[i][key].length; j++) { %>
          <% for (rescheduleKey in reschedules[i][key][j]) { %>
            <tr>
              <td><%= rescheduleKey %></td>
              <td><%= reschedules[i][key][j][rescheduleKey] %></td>
            </tr>
          <% } %>
        <% } %>
      </table>
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

<pre>
<% for (var i = 0; i < knowhow.length; i++) { %>
> <%= knowhow[i] %>
<% } %>
</pre>

## 振り返り


<pre>
<% for (var i = 0; i < reviews.length; i++) { %>
> <%= reviews[i] %>
<% } %>
</pre>
