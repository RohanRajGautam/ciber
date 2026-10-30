import subprocess
from variables import tools_precheck, tool_names

class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    BADFAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

    BG_ERR_TXT  = '\033[41m' # For critical errors and crashes
    BG_HEAD_TXT = '\033[100m'
    BG_ENDL_TXT = '\033[44m'
    BG_CRIT_TXT = '\033[45m'
    BG_HIGH_TXT = '\033[41m'
    BG_MED_TXT  = '\033[43m'
    BG_LOW_TXT  = '\033[44m'
    BG_INFO_TXT = '\033[42m'

    BG_SCAN_TXT_START = '\x1b[6;30;42m'
    BG_SCAN_TXT_END   = '\x1b[0m'

# Clears Line
def clear():
        sys.stdout.write("\033[F")
        sys.stdout.write("\033[K") #clears until EOL

print('hello')
# Tool Pre Checker
rs_avail_tools = 0
arg1 = 0

print(bcolors.BG_HEAD_TXT+"[ Checking Available Security Scanning Tools Phase... Initiated. ]"+bcolors.ENDC)

unavail_tools_names = list()

while (rs_avail_tools < len(tools_precheck)):
    precmd = str(tools_precheck[rs_avail_tools][arg1])
    try:
        p = subprocess.Popen([precmd], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE,shell=True)
        output, err = p.communicate()
        val = output + err
    except:
        print("\t"+bcolors.BG_ERR_TXT+"Scan was terminated abruptly..."+bcolors.ENDC)
        sys.exit(1)
    
    # If the tool is not found or it's part of the --skip argument(s), disabling it
    if b"not found" in val:
        if b"not found" in val:
            print("\t"+bcolors.OKBLUE+tools_precheck[rs_avail_tools][arg1]+bcolors.ENDC+bcolors.BADFAIL+"...unavailable."+bcolors.ENDC)
        for scanner_index, scanner_val in enumerate(tool_names):
            if scanner_val[2] == tools_precheck[rs_avail_tools][arg1]:
                scanner_val[3] = 0 # disabling scanner as it's not available.
                unavail_tools_names.append(tools_precheck[rs_avail_tools][arg1])

    else:
        print("\t"+bcolors.OKBLUE+tools_precheck[rs_avail_tools][arg1]+bcolors.ENDC+bcolors.OKGREEN+"...available."+bcolors.ENDC)
    rs_avail_tools = rs_avail_tools + 1
unavail_tools_names = list(set(unavail_tools_names))
if len(unavail_tools_names) == 0:
    print("\t"+bcolors.OKGREEN+"All Scanning Tools are available. Complete vulnerability checks will be performed by RapidScan."+bcolors.ENDC)
else:
    print("\t"+bcolors.WARNING+"Some of these tools "+bcolors.BADFAIL+str(unavail_tools_names)+bcolors.ENDC+bcolors.WARNING+" are unavailable or will be skipped. Ciber will still perform the rest of the tests."+bcolors.ENDC)
print(bcolors.BG_ENDL_TXT+"[ Checking Available Security Scanning Tools Phase... Completed. ]"+bcolors.ENDC)
print("\n")
