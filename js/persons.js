const persons = [
    {   
        visible: true,
        surname: 'Сарухутдинова',
        name: 'Вениаммин',
        patronymic: 'Венниаминович',
        dataOfBirth: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00,
        dataOfDeath: '',
        imageURL: 'img/test-person.png',
        pageURL: '',
        gridPositionX: 0,
        gridPositionY: 0,
        connectionLeft: {
            isConnection: false,
            dateStart: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00
            dateEnd: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00
            casual: false,
            married: false,
            divorce: false,
            children: false,
            childrenLeftLineLength: 1,
            childrenRightLineLength: 0
        },
        connectionRight: {
            isConnection: true,
            dateStart: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00
            dateEnd: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00
            casual: false,
            married: true,
            divorce: false,
            children: true,
            childrenLeftLineLength: 0,
            childrenRightLineLength: 0
        }
    },
    {   
        visible: true,
        surname: 'Сарухутдинова',
        name: 'Вениаммин',
        patronymic: 'Венниаминович',
        dataOfBirth: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00,
        dataOfDeath: '',
        imageURL: 'img/test-person.png',
        pageURL: '',
        gridPositionX: 1,
        gridPositionY: 0,
        connectionLeft: {
            isConnection: true,
            dateStart: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00
            dateEnd: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00
            casual: false,
            married: true,
            divorce: false,
            children: false,
            childrenLeftLineLength: 0,
            childrenRightLineLength: 0
        },
        connectionRight: {
            isConnection: true,
            dateStart: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00
            dateEnd: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00
            casual: true,
            married: false,
            divorce: false,
            children: true,
            childrenLeftLineLength: 0,
            childrenRightLineLength: 0
        }
    },
    {   
        visible: true,
        surname: 'Сарухутдинова',
        name: 'Вениаммин',
        patronymic: 'Венниаминович',
        dataOfBirth: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00,
        dataOfDeath: '',
        imageURL: 'img/test-person.png',
        pageURL: '',
        gridPositionX: -0.5,
        gridPositionY: 1,
        connectionLeft: {
            isConnection: false,
            dateStart: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00
            dateEnd: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00
            casual: false,
            married: false,
            divorce: false,
            children: false,
            childrenLeftLineLength: 0,
            childrenRightLineLength: 0
        },
        connectionRight: {
            isConnection: false,
            dateStart: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00
            dateEnd: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00
            casual: false,
            married: false,
            divorce: false,
            children: false,
            childrenLeftLineLength: 0,
            childrenRightLineLength: 0
        }
    },
    {   
        visible: true,
        surname: 'Сарухутдинова',
        name: 'Вениаммин',
        patronymic: 'Венниаминович',
        dataOfBirth: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00,
        dataOfDeath: '',
        imageURL: 'img/test-person.png',
        pageURL: '',
        gridPositionX: 0.5,
        gridPositionY: 1,
        connectionLeft: {
            isConnection: false,
            dateStart: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00
            dateEnd: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00
            casual: false,
            married: false,
            divorce: false,
            children: false,
            childrenLeftLineLength: 0,
            childrenRightLineLength: 0
        },
        connectionRight: {
            isConnection: true,
            dateStart: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00
            dateEnd: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00
            casual: false,
            married: true,
            divorce: false,
            children: true,
            childrenLeftLineLength: 0,
            childrenRightLineLength: 0
        }
    }
];