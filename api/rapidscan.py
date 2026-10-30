#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#                              
#   _____ _____ ____  ______ _____  
#  / ____|_   _|  _ \|  ____|  __ \ 
# | |      | | | |_) | |__  | |__) |
# | |      | | |  _ <|  __| |  _  / 
# | |____ _| |_| |_) | |____| | \ \ 
#  \_____|_____|____/|______|_|  \_\
#                                                                     

#
# Tool       : Ciber
# Usage      : python3 rapidscan.py example.com
# Description: This scanner automates the process of security scanning by using a
#              multitude of available linux security tools and some custom scripts.
#

# Importing the libraries
import os
import re
import sys
import math
import uuid
import time
import json
import random
import argparse
import threading
import subprocess
from urllib.parse import urlsplit

from variables import tool_names, tool_cmd, tool_resp, tool_status, tools_fix, tools_precheck

# Scan Time Elapser
intervals = (
    ('h', 3600),
    ('m', 60),
    ('s', 1),
    )
def display_time(seconds, granularity=3):
    result = []
    seconds = seconds + 1
    for name, count in intervals:
        value = seconds // count
        if value:
            seconds -= value * count
            result.append("{}{}".format(value, name))
    return ' '.join(result[:granularity])


def terminal_size():
    '''
    Get the terminal size
    :return: The function terminal_size() returns the number of columns in the terminal.
    '''
    try:
        rows, columns = subprocess.check_output(['stty', 'size']).split()
        return int(columns)
    except subprocess.CalledProcessError as e:
        return int(20)
    


def url_maker(url):
    '''
    Given a URL, return the hostname
    
    :param url: The URL to be parsed
    :return: A string of the hostname.
    '''
    if not re.match(r'http(s?)\:', url):
        url = 'http://' + url
    parsed = urlsplit(url)
    host = parsed.netloc
    if host.startswith('www.'):
        host = host[4:]
    return host

def check_internet():
    '''
    This function checks to see if there is an internet connection
    :return: A value of 1 or 0. 1 means that the internet is available. 0 means that the internet is not
    available.
    '''
    os.system('ping -c1 github.com > rs_net 2>&1')
    if "0% packet loss" in open('rs_net').read():
        val = 1
    else:
        val = 0
    os.system('rm rs_net > /dev/null 2>&1')
    return val



# Classifies the Vulnerability's Severity
def vul_info(val):
    result =''
    if val == 'c':
        result = "critical"
    elif val == 'h':
        result = "high"
    elif val == 'm':
        result = "medium"
    elif val == 'l':
        result = "low"
    else:
        result = "info"
    return result

# Legends
proc_high = 'high'
proc_med  = 'medium'
proc_low  = 'low'

# Links the vulnerability with threat level and remediation database
def vul_remed_info(v1,v2,v3):
    vul_remedey = {
        'id': tool_names[tool][arg1],
        'tool_name': tool_names[tool][arg2],
        'threat_level': vul_info(v2),
        'vul_definition': tools_fix[v3-1][1],
        'threat_name': tool_resp[v1][0],
        'vul_remediation': tools_fix[v3-1][2]
    }

    return vul_remedey


# Clears Line
def clear():
        sys.stdout.write("\033[F")
        sys.stdout.write("\033[K") #clears until EOL

# Ciber Logo during initialization
def logo():
    print(bcolors.WARNING)
    logo_ascii = """
                
    _____ _____ ____  ______ _____
    / ____|_   _|  _ \|  ____|  __ \ 
    | |      | | | |_) | |__  | |__) |
    | |      | | |  _ <|  __| |  _  / 
    | |____ _| |_| |_) | |____| | \ \ 
    \_____|_____|____/|______|_|  \_\ 
                                    
    ( Web vulnerability scanner )

    """
    print(logo_ascii)
    print(bcolors.ENDC)


# Initiliazing the idle loader/spinner class
class Spinner:
    busy = False
    delay = 0.005 # 0.05

    @staticmethod
    def spinning_cursor():
        while 1:
            #for cursor in '|/-\\/': yield cursor #←↑↓→
            #for cursor in '←↑↓→': yield cursor
            #for cursor in '....scanning...please..wait....': yield cursor
            for cursor in ' ': yield cursor
    def __init__(self, delay=None):
        self.spinner_generator = self.spinning_cursor()
        if delay and float(delay): self.delay = delay
        self.disabled = False

    def spinner_task(self):
        '''
        It prints a spinning cursor and then clears the line
        '''
        inc = 0
        try:
            while self.busy:
                if not self.disabled:
                    # x = bcolors.BG_SCAN_TXT_START+next(self.spinner_generator)+bcolors.BG_SCAN_TXT_END
                    x = next(self.spinner_generator)
                    inc = inc + 1
                    print(x,end='')
                    if inc>random.uniform(0,terminal_size()): #30 init
                        # print(end="\r")
                        # bcolors.BG_SCAN_TXT_START = '\x1b[6;30;'+str(round(random.uniform(40,47)))+'m'
                        inc = 0
                    sys.stdout.flush()
                time.sleep(self.delay)
                if not self.disabled:
                    sys.stdout.flush()

        except (KeyboardInterrupt, SystemExit):
            print("\n\t"+ bcolors.BG_ERR_TXT+"RapidScan received a series of Ctrl+C hits. Quitting..." +bcolors.ENDC)
            sys.exit(1)

    def start(self):
        self.busy = True
        try:
            threading.Thread(target=self.spinner_task).start()
        except Exception as e:
            print("\n")
        
    def stop(self):
        try:
            self.busy = False
            time.sleep(self.delay)
        except (KeyboardInterrupt, SystemExit):
            print("\n\t"+ bcolors.BG_ERR_TXT+"RapidScan received a series of Ctrl+C hits. Quitting..." +bcolors.ENDC)
            sys.exit(1)

# End ofloader/spinner class

# Instantiating the spinner/loader class
spinner = Spinner()


def get_parser():
    '''
    The get_parser() function creates an argument parser object. 
    It then uses the add_help=False argument to prevent the parser from generating its own help message.
    
    It then adds the help argument, which is the only argument added to the parser object. 
    The help argument is a boolean argument that, when set to True, will cause the parser to display the
    help message and exit. 
    :return: A parser object.
    '''

    parser = argparse.ArgumentParser(add_help=False)
    parser.add_argument('-n', '--nospinner', action='store_true', 
                        help='Disable the idle loader/spinner.')
    parser.add_argument('-ph', '--phigh', action='store_true',
                        help='Select tools with high processing power consumption.')
    parser.add_argument('-pm', '--pmed', action='store_true',
                        help='Select tools with medium processing power consumption.')
    parser.add_argument('-pl', '--plow', action='store_true',
                        help='Select tools with low processing power consumption.')
    parser.add_argument('target', nargs='?', metavar='URL', help='URL to scan.', default='', type=str)
    return parser


# Shuffling Scan Order (starts)
scan_shuffle = list(zip(tool_names, tool_cmd, tool_resp, tool_status))

# This code is using the argparse module to create a parser that will take in arguments from the
# command line.
# The parser is then stored in a variable called args_namespace.
# args_namespace = get_parser().parse_args()

# if args_namespace.phigh:                                    # Scans all the commands
#     scan_shuffle
# elif args_namespace.pmed:                                   # Scans low and medium processing processes
#     # We take the scan_shuffle
#     # list and remove all tuples where the third element of the fourth element of
#     # the tuple is equal to the process high.
#     scan_shuffle = [element for element in scan_shuffle
#         if element[3][2] != proc_high]
# elif args_namespace.plow:                                   # Scans only low processing processes
#     # Taking the scan_shuffle list and iterating through it.
#     # It is then taking the element and checking if the third element
#     # in the fourth element of the element is equal to proc_low.
#     # If it is, it is appending the element to scan_shuffle.
#     # It is then returning scan_shuffle.
#     scan_shuffle = [element for element in scan_shuffle
#         if element[3][2] == proc_low]
# else:
#     scan_shuffle

random.shuffle(scan_shuffle)
tool_names, tool_cmd, tool_resp, tool_status = zip(*scan_shuffle)
tool_checks = (len(tool_names) + len(tool_resp) + len(tool_status)) / 3 # Cross verification incase, breaks.
tool_checks = round(tool_checks)
# Shuffling Scan Order (ends)

# Tool Head Pointer: (can be increased but certain tools will be skipped)
tool = 0

# Run Test
runTest = 1

# For accessing list/dictionary elements
arg1 = 0
arg2 = 1
arg3 = 2
arg4 = 3
arg5 = 4
arg6 = 5

# Detected Vulnerabilities [will be dynamically populated]
rs_vul_list = list()
rs_vul_num = 0
rs_vul = 0

# Total Time Elapsed
rs_total_elapsed = 0

# Tool Pre Checker
rs_avail_tools = 0

# Checks Skipped
rs_skipped_checks = 0

if len(sys.argv) == 1:
    logo()
    sys.exit(1)

args_namespace = get_parser().parse_args()

if args_namespace.nospinner:
    spinner.disabled = True

elif args_namespace.target:
    spinner.disabled = True
    target = url_maker(args_namespace.target)
    #target = args_namespace.target
    os.system('rm /var/www/ciber/api/output/te* > /dev/null 2>&1') # Clearing previous scan files
    # os.system('clear')
    # os.system('setterm -cursor off')
    # logo()

    # global vulnerabilities
    vulnerabilities = []

    while(tool < len(tool_names)):
        # print("["+tool_status[tool][arg3]+tool_status[tool][arg4]+"] Deploying "+str(tool+1)+"/"+str(tool_checks)+" | "+bcolors.OKBLUE+tool_names[tool][arg2]+bcolors.ENDC,)
        if tool_names[tool][arg4] == 0:
            # print("\nScanning Tool Unavailable. Skipping Test...\n")
            rs_skipped_checks = rs_skipped_checks + 1
            tool = tool + 1
            continue
        try:
            spinner.start()
        except Exception as e:
            print("\n")
        scan_start = time.time()
        temp_file = "/var/www/ciber/api/output/rapidscan_temp_"+target+"_"+tool_names[tool][arg1]
        cmd = tool_cmd[tool][arg1]+target+tool_cmd[tool][arg2]+" > "+temp_file+" 2>&1"

        try:
            subprocess.check_output(cmd, shell=True)
        except KeyboardInterrupt:
            runTest = 0
        except:
            runTest = 1

        if runTest == 1:
            spinner.stop()
            scan_stop = time.time()
            elapsed = scan_stop - scan_start
            rs_total_elapsed = rs_total_elapsed + elapsed
            scan_details = {
                "id": tool_names[tool][arg1],
                "name": tool_names[tool][arg2],
                "elapsed": math.ceil(elapsed),
                "status": tool_status[tool][arg3],
                "vul": [],
            }
            vulnerabilities.append(scan_details)
            # print(bcolors.OKBLUE+"\b...Completed in "+display_time(int(elapsed))+bcolors.ENDC+"\n")
            # sys.stdout.write(ERASE_LINE)
            # print('Scan Completed in'+display_time(int(elapsed)))
            # print("\n")
            # clear()
            rs_tool_output_file = open(temp_file).read()
            if tool_status[tool][arg2] == 0:
                if tool_status[tool][arg1].lower() in rs_tool_output_file.lower():
                    # print "\t"+ vul_info(tool_resp[tool][arg2]) + bcolors.BADFAIL +" "+ tool_resp[tool][arg1] + bcolors.ENDC
                    vul_output = vul_remed_info(tool,tool_resp[tool][arg2],tool_resp[tool][arg3])

                    rs_vul_list.append(tool_names[tool][arg1]+"*"+tool_names[tool][arg2])
                    scan_details['vul'].append(vul_output.copy())
            else:
                if any(i in rs_tool_output_file for i in tool_status[tool][arg6]):
                    m = 1 # This does nothing.
                else:
                    #print "\t"+ vul_info(tool_resp[tool][arg2]) + bcolors.BADFAIL +" "+ tool_resp[tool][arg1] + bcolors.ENDC
                    vul_output = vul_remed_info(tool,tool_resp[tool][arg2],tool_resp[tool][arg3])
                    rs_vul_list.append(tool_names[tool][arg1]+"*"+tool_names[tool][arg2])
                    scan_details['vul'].append(vul_output.copy())
        else:
                runTest = 1
                spinner.stop()
                scan_stop = time.time()
                elapsed = scan_stop - scan_start
                rs_total_elapsed = rs_total_elapsed + elapsed
                #sys.stdout.write(CURSOR_UP_ONE) 
                # sys.stdout.write(ERASE_LINE)
                #print("-" * terminal_size(), end='\r', flush=True)
                # print(bcolors.OKBLUE+"\nScan Interrupted in "+display_time(int(elapsed))+bcolors.ENDC, end='\r', flush=True)
                # print("\n"+bcolors.WARNING + "\tTest Skipped. Performing Next. Press Ctrl+Z to Quit Scan.\n" + bcolors.ENDC)
                rs_skipped_checks = rs_skipped_checks + 1

        tool=tool+1


    # print(bcolors.BG_ENDL_TXT+"[ Preliminary Scan Phase Completed. ]"+bcolors.ENDC)
    # print("\n")

    #################### Report & Documentation Phase ###########################
    # print(bcolors.BG_HEAD_TXT+"[ Report Generation Phase Initiated. ]"+bcolors.ENDC)
    if len(rs_vul_list)==0:
        print("No Vulnerabilities Detected.")
    else:
        with open("/var/www/ciber/api/output/"+target+"_vulnerability_report.txt", "w+") as report:
            while(rs_vul < len(rs_vul_list)):
                vuln_info = rs_vul_list[rs_vul].split('*')
                report.write(vuln_info[arg2])
                report.write("\n------------------------\n\n")
                temp_report_name = "/var/www/ciber/api/output/rapidscan_temp_"+target+"_"+vuln_info[arg1]
                with open(temp_report_name, 'r') as temp_report:
                    data = temp_report.read()
                    report.write(data)
                    report.write("\n\n")
                temp_report.close()
                rs_vul = rs_vul + 1

            # print("\tComplete Vulnerability Report for "+bcolors.OKBLUE+target+bcolors.ENDC+" named "+bcolors.OKGREEN+"`RS-Vulnerability-Report`"+bcolors.ENDC+" is available under the same directory RapidScan resides.")

        report.close()


    # Writing all scan files output into Debug-ScanLog for debugging purposes.


    with open("/var/www/ciber/api/output/result-"+target+".json", "w+") as report:
        scan_output = {
                "website_url": target,
                "results": vulnerabilities, 
                "total_checks": len(tool_names), 
                "skipped_checks": rs_skipped_checks, 
                "total_vul": len(rs_vul_list)
            }

        oout = json.dumps(scan_output, separators=(',', ':'), sort_keys=True, indent=4)

        report.write(oout)

    report.close()
#     print(bcolors.BG_ENDL_TXT+"[ Report Generation Phase Completed. ]"+bcolors.ENDC)

    # os.system('setterm -cursor on')
    # Clearing the previous scan files.
os.system('rm /var/www/ciber/api/output/rapidscan_te* > /dev/null 2>&1') # Clearing previous scan files
