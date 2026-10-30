# golismero install has been skipped. 
# See issue https://github.com/golismero/golismero/issues/59
# RUN apt-get install -y golismero
# This fails, so we skip completely for now. See issue https://github.com/kislyuk/argcomplete/issues/348
# RUN cd /opt && git clone https://github.com/golismero/golismero.git && cd golismero && pip install -r requirements.txt && ln -s /opt./golismero/golismero.py /usr/bin/golismero

FROM kalilinux/kali-last-release as base
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update && apt-get -yu dist-upgrade -y
RUN apt-get install -y ca-certificates
# RUN echo "deb https://http.kali.org/kali kali-rolling main contrib non-free" > ./etc/apt/sources.list
# RUN echo "deb http://old.kali.org/kali sana main non-free contrib" >> ./etc/apt/sources.list

RUN apt-get -yq install \
  python2 \
  python3 \
  python3-pip \
  git \
  perl \
  nmap \
  sslscan \
  host \
  whois \
  sslyze \
  wapiti \
  nmap \
  dmitry \
  dnsenum \
  dnsmap \
  dnsrecon \
  dnswalk \
  dirb \
  wafw00f \
  whatweb \
  nikto \
  lbd \
  xsser \
  fierce \
  theharvester \
  davtest \
  uniscan \
  amass \
  wget && \
  apt-get -yq autoremove && \
  apt-get clean && \
  rm -rf /var/lib/{apt,dpkg,cache,log}

RUN cd /opt \
  ln -sf $(which python3) /usr/bin/python && \
  git clone https://github.com/golismero/golismero.git && \
  cd golismero && \
  pip install docutils && \
  pip install --no-cache-dir -r requirements.txt && \
  pip install --no-cache-dir -r requirements_unix.txt && \
  sed '1 s/^.*$/\#\!\/usr\/bin\/env python2/' golismero.py > golismero.py2 && \
  chmod +x golismero.py2 && \
  ln -s ${PWD}/golismero.py2 /usr/bin/golismero 

FROM base as dev

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt


FROM base as prod

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r requirements-prod.txt

EXPOSE 8080

CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0"]
