// Include guard
#ifndef __helper_h_INCLUDED__      // <- if pointerstruct.h hasn't been included yet...
#define __helper_h_INCLUDED__     // <- #define this so that it can be included

#include <pthread.h>
#include <stdio.h>
#include <string>
#include <iostream>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <sstream>
#include <fstream>
#include <sys/stat.h>
#include <fcntl.h>

using namespace std;

class pointerhelper
{
    public:
        int get_length();
        int*get_rand_arr(int);
        int**sort_ptr_adr();
};

#endif

