<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/12/15
  Time: 10:24
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=GBK"  %>
<html>
  <head>
    <title>������</title>
  </head>
  <body bgcolor="#7fffd4">
  <h1>����������</h1>
  <form id = "calcForm" METHOD="post" action="add.action">
    <table>
      <tbody>
      <tr>
        <td>��һ����</td>
        <td><input type="text" name="num1"/></td>
      </tr>
      <tr>
        <td>�ڶ�����</td>
        <td><input type="text" name="num2"/></td>
      </tr>
      <td><input type="submit" value="��"></td>
      </tbody>
    </table>
    </form>

  <form id = "calcForm0" METHOD="post" action="subtract.action">
    <table>
      <tbody>
      <tr>
        <td>��һ����</td>
        <td><input type="text" name="num1"/></td>
      </tr>
      <tr>
        <td>�ڶ�����</td>
        <td><input type="text" name="num2"/></td>
      </tr>
      <td><input type="submit" value="��"></td>
      </tbody>
    </table>
  </form>
  </body>
</html>
