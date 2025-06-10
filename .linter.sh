#!/bin/bash
cd /home/kavia/workspace/code-generation/noteease-28585-3b2aca50/noteease_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

