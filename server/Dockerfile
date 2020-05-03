FROM python:3.8.2

RUN pip install --upgrade pip

RUN pip install setuptools
RUN pip install Flask
RUN pip install mysql-connector
RUN pip install uuid
RUN pip install psycopg2

RUN pip install flask-jwt-extended

COPY /src /server
WORKDIR /server
EXPOSE 4000
CMD ["python", "server.py"]