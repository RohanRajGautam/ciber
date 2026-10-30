from subprocess import Popen , PIPE, check_output
import os

target = 'webpoint.io'
commands = [
    'date ',
    'sleep 10 && echo "After 10 seconds"',
    'echo "Hello"',
    'ls',
    'pwd',
    'ls',
    'host {}'.format(target)
]
# run in parallel
processes = [Popen(cmd, shell=True) for cmd in commands]
# do other things here..
# wait for completion
for p in processes:
    p.wait()
    print(p)

# tool = 0

# tool_names = [
#                 #1
#                 ["host","Host - Checks for existence of IPV6 address.","host",1],

#                 #2
#                 ["aspnet_config_err","ASP.Net Misconfiguration - Checks for ASP.Net Misconfiguration.","wget",1],

#                 #3
#                 ["wp_check","WordPress Checker - Checks for WordPress Installation.","wget",1],

#                 #4
#                 ["drp_check", "Drupal Checker - Checks for Drupal Installation.","wget",1],

#                 #5
#                 ["joom_check", "Joomla Checker - Checks for Joomla Installation.","wget",1],
# ]

# arg1 = 0
# arg2 = 1


# tool_cmd   = [
#                 #1
#                 ["dnsenum ","webpoint.io"],

#                 #2
#                 ["fierce --domain ","webpoint.io"],

#                 #3
#                 ["dmitry -e ","webpoint.io"],

#                 #4
#                 ["dmitry -s ","webpoint.io"],

#                 #5
#                 ["nmap -p23 --open -Pn ","webpoint.io"],
# ]

# commands = []

# for tool in range(len(tool_names)):
#     temp_file = "/tmp/rapidscan_temp_"+tool_names[tool][arg1]
#     cmd = tool_cmd[tool][arg1]+tool_cmd[tool][arg2]+" > "+temp_file+" 2>&1"
#     commands.append(cmd)

# # print(commands)
# try:
#         # # run in parallel
#         if not os.path.exists('/tmp/'+target):
#             os.makedirs('/tmp/'+target)
#         # p1 = subprocess.Popen("mkdir /tmp/"+target, shell=True)
#         # p1.communicate()
#         # os.chdir("/tmp/"+target)
#         # processes = [Popen(cmds, shell=True) for cmds in commands]
#         # do other things here..
#         # wait for completion
#         # for p in processes:
#         #     print(p)
#         #     p.wait()
# except:
#     print('fail')


# <==============================================>

# for command in tool_cmd:
    #         command[0:2] = [''.join(command[0:2])]
    #         command = [command.append(command)]
    #         lst = itertools.chain(command)
    #         print(lst)
    

    # commands = []
    # for tool in range(len(tool_names)):
    #     temp_file = "/tmp/rapidscan_temp_"+tool_names[tool][arg1]
    #     cmd = tool_cmd[tool][arg1]+tool_cmd[tool][arg2]+" > "+temp_file+" 2>&1"
    #     commands.append(cmd)

    # try:
    #         # # run in parallel
    #         processes = [Popen(cmds, shell=True) for cmds in commands]
    #         # do other things here..
    #         # wait for completion
    #         for p in processes:
    #             p.wait()
    # except KeyboardInterrupt:
    #     runTest = 0
    # except:
    #     runTest = 1
        


        # temp_file = "/tmp/"+target+"/rapidscan_temp_"+tool_names[tool][arg1]

# if not os.path.exists('/tmp/'+target):
#                 os.makedirs('/tmp/'+target)

        # try:
        #         # print('commands: ', tool_cmd)
        #         # for commands in tool_cmd:
        #         #         commands[0:2] = [''.join(commands[0:2])]
        #         #         # commands = [commands.append(commands)]
        #         #         # lst = itertools.chain(commands)
        #         #         print(commands)
        #         # print(cmd)
        #         # commands = []
        #         # commands.extends(cmd)
        #         # subprocess.check_output(cmd, shell=True)
        #         # print('commands: ', commands)
        #         # p = subprocess.Popen([tool_cmd], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE,shell=True)
        #         # output, err = p.communicate()
        #         # val = output + err
        #         # # run in parallel
        #         processes = [Popen(cmds, shell=True) for cmds in commands]
        #         # do other things here..
        #         # wait for completion
        #         for p in processes:
        #             p.wait()
        # except KeyboardInterrupt:
        #     runTest = 0
        # except:
        #     runTest = 1
