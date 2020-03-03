FROM python:3.6

RUN pip install -U setuptools
RUN pip install -U Flask
RUN pip install -U mysql-connector
RUN pip install -U uuid

COPY /src /server
WORKDIR /server
EXPOSE 7002
CMD ["python", "server.py"]