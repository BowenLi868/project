<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/12/15
  Time: 11:44
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=GBK" pageEncoding="GBK" %>
<html>
<head>
  <title>������</title>
</head>
<body bgcolor="#7fffd4">
<h1>����������</h1>

  <table>
    <tbody>
    <tr>
      <td>��һ����</td>
      <td>${param.num1}</td>
    </tr>
    <tr>
      <td>�ڶ�����</td>
      <td>${param.num2}</td>
    </tr>

    <tr>
      <td>���</td>
      <td>${result}</td>
    </tr>
    </tbody>

  </table>

  <button onclick="history.go(-1);">����</button>

</body>
</html>
