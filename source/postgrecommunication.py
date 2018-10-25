import psycopg2

ex_connect_str = "dbname='tododb' user='glebasson' host='localhost'" + \
    "password='1'"

def connect_to_db(connect_str):
    try:
        con = psycopg2.connect(connect_str)
        cursor = con.cursor()
        return cursor
    except Exception as e:
        print("Cant't connect")
        print(e)

def add_user(login, passwd, cursor):
    try:
        cursor.execute(" INSERT INTO Users (login, passwd) VALUES(%s, %s);""", (login, passwd))
        cursor.connection.commit()
        cursor.execute("""SELECT * FROM Users;""")
        print(cursor.fetchall())
    except Exception as e:
        print(e)

curs = connect_to_db(ex_connect_str)

add_user("random daun", "123", curs)

