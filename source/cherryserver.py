import cherrypy
import psycopg2
from psycopg2.extras import RealDictCursor
import json
from tut import rawdata2dict
import os

# Index page
class TODOList(object):

    @cherrypy.expose
    def index(self):
        return open('./public/index.html')


# RESTFUL API
@cherrypy.expose
class TODOAPI(object):

    # Connect to db on init
    def __init__(self):
        connect_str = "dbname='tododb' user='glebasson' host='localhost'" + \
                      "password='1'"
        try:
            self.con = psycopg2.connect(connect_str)
            self.cursor = self.con.cursor(cursor_factory=RealDictCursor)
        except Exception as e:
            print(e)

    def __del__(self):
        self.cursor.close()
        self.con.close()

    # Requests handling
    @cherrypy.tools.accept(media='application/json')
    def GET(self):
        if self.cursor:
            query = "SELECT id, text, status FROM TASKS;"
            self.cursor.execute(query)
            data = self.cursor.fetchall()
        return json.dumps(data)

    def PUT(self, tasktext):
        if self.cursor:
            try:
                query = "INSERT INTO TASKS (text) VALUES (%s) RETURNING " + \
                    "ID, TEXT, STATUS"
                self.cursor.execute(query, (tasktext, ))
            except psycopg2.Error as e:
                self.con.rollback()
                raise cherrypy.HTTPError(500, e.pgerror)
            else:
                self.con.commit()
                return json.dumps(self.cursor.fetchone())



    def DELETE(self):
        rawdata = cherrypy.request.body.readline()
        utf_str = rawdata.decode('utf-8')
        id = utf_str.split('=')[1]
        if self.cursor:
            try:
                query = "DELETE FROM TASKS WHERE ID=%s;"
                self.cursor.execute(query, (id, ))
                self.con.commit()
            except psycopg2.Error as e:
                self.con.rollback()
                raise cherrypy.HTTPError(500, e.pgerror)
            else:
                self.con.commit()

    def UPDATE(self):
        rawdata = cherrypy.request.body.readline()
        data = rawdata2dict(rawdata)
        if self.cursor:
            try:
                query = "UPDATE TASKS SET STATUS=%s WHERE ID=%s;"
                self.cursor.execute(query, (data['status'], data['task_id']))
                self.con.commit()
            except psycopg2.Error as e:
                self.con.rollback()
                raise cherrypy.HTTPError(500, e.pgerror)
            else:
                self.con.commit()



web = TODOList()
web.api = TODOAPI()
cherrypy.quickstart(web, '/', "server.conf")

