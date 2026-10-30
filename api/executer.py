from subprocess import Popen, PIPE
import shlex
from ansi2html import Ansi2HTMLConverter

# The execute function takes in a website and returns the output of the command.
def execute(website, pVal):
    
    # This is used to convert the output of the command into HTML.
    # conv = Ansi2HTMLConverter(title="Testing for vulnerabilities", linkify=True, font_size='1.3em')
    
    # Using the shlex module to split the command into a list of arguments.
    command = shlex.split('python3 rapidscan.py %s %s' % (website, pVal))

    # Running the command and storing the output in the process variable.
    # 
    # # Python
    # stdout, stderr = process.communicate()
    process = Popen(command, stdout=PIPE, stderr=PIPE, shell=False, universal_newlines=True)

    # The readline() method is used to read a single line from the stream.
    for line in iter(process.stdout.readline, b''):
      if line == '' and process.poll() is not None: # The poll() method is used to check if the process has terminated.
        break
      yield line.rstrip() # The rstrip() method is used to remove the trailing newline character from the string.
      # yield conv.convert(line.rstrip())

    # Capture if the input throws an error
    for line in iter(process.stderr.readline, b''):
      if line == '' and process.poll() is not None:
        break
      yield line
