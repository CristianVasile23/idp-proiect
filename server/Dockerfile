FROM python:3.8.2

RUN pip install --upgrade pip

RUN pip install -U setuptools
RUN pip install -U Flask
RUN pip install -U mysql-connector
RUN pip install -U uuid

RUN pip install flask-jwt-extended

COPY /src /server
WORKDIR /server
EXPOSE 4000
CMD ["python", "server.py"]