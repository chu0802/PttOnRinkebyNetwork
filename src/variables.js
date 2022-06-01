export const contract_addr = "0x4c6C0613cfc085fA63Cad53BB15D8dace0EA47e3";
export var get_posts_option = {
    contractAddress: contract_addr,
    functionName: "get_posts",
    abi: [{
      "constant": true,
      "inputs": [],
      "name": "get_posts",
      "outputs": [
        {
          "components": [
            {
              "name": "type_",
              "type": "string"
            },
            {
              "name": "title",
              "type": "string"
            },
            {
              "name": "content",
              "type": "string"
            },
            {
              "name": "author",
              "type": "string"
            },
            {
              "name": "author_addr",
              "type": "address"
            },
            {
              "name": "pb_value",
              "type": "int256"
            },
            {
              "name": "post_time",
              "type": "uint256"
            },
            {
              "name": "id",
              "type": "uint256"
            }
          ],
          "name": "",
          "type": "tuple[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }]
}

export var new_post_option = {
    contractAddress: contract_addr,
    functionName: "new_post",
    abi: [{
      "constant": false,
      "inputs": [
        {
          "name": "addr",
          "type": "address"
        },
        {
          "name": "_type_",
          "type": "string"
        },
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "text",
          "type": "string"
        }
      ],
      "name": "new_post",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }]
}

export var new_comment_option = {
  contractAddress: contract_addr,
  functionName: "new_comment",
  abi: [{
		"constant": false,
		"inputs": [
			{
				"name": "_from",
				"type": "address"
			},
			{
				"name": "post_id",
				"type": "uint256"
			},
			{
				"name": "_like",
				"type": "bool"
			},
			{
				"name": "text",
				"type": "string"
			},
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "new_comment",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}]
}

export var join_option = {
  contractAddress: contract_addr,
  functionName: "join",
  abi:[
    {
      "constant": false,
      "inputs": [
        {
          "name": "addr",
          "type": "address"
        },
        {
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "join",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
}

export var get_comments_option = {
  contractAddress: contract_addr,
  functionName: "get_comments",
  abi:[
    {
      "constant": true,
      "inputs": [
        {
          "name": "post_id",
          "type": "uint256"
        }
      ],
      "name": "get_comments",
      "outputs": [
        {
          "components": [
            {
              "name": "id",
              "type": "uint256"
            },
            {
              "name": "like",
              "type": "bool"
            },
            {
              "name": "content",
              "type": "string"
            },
            {
              "name": "comment_time",
              "type": "uint256"
            },
            {
              "name": "author",
              "type": "string"
            },
            {
              "name": "author_addr",
              "type": "address"
            }
          ],
          "name": "",
          "type": "tuple[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]
}

export var addrToName_option = {
  contractAddress: contract_addr,
  functionName: "addrToName",
  abi:[
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "addrToName",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]
}